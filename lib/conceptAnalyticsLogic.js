const DEFAULT_LIMIT = 4;

export function getConceptFocusInsights({ categories = [], limit = DEFAULT_LIMIT, reviewRecommendations = [], weakAreaInsights = [], wrongAnswerIdsByCategory = {} } = {}) {
  const conceptStatsByTag = new Map();
  const questionLookup = getQuestionLookup(categories);

  for (const category of categories) {
    const wrongQuestionIds = normalizeQuestionIds(wrongAnswerIdsByCategory[category.categoryId]);

    for (const questionId of wrongQuestionIds) {
      const question = questionLookup.get(questionId);

      if (!question) {
        continue;
      }

      for (const conceptTag of getQuestionConceptTags(question)) {
        const stat = getOrCreateConceptStat(conceptStatsByTag, conceptTag);
        stat.missedQuestionCount += 1;
        stat.categoryLabels.add(question.categoryLabel);
      }
    }
  }

  for (const recommendation of reviewRecommendations) {
    const question = questionLookup.get(recommendation.mostRecentQuestionId);

    if (!question) {
      continue;
    }

    for (const conceptTag of getQuestionConceptTags(question)) {
      const stat = getOrCreateConceptStat(conceptStatsByTag, conceptTag);
      stat.reviewSignalCount += 1;
      stat.categoryLabels.add(question.categoryLabel);
    }
  }

  for (const weakArea of weakAreaInsights) {
    if (!weakArea?.categoryId) {
      continue;
    }

    const category = categories.find((item) => item.categoryId === weakArea.categoryId);
    const wrongQuestionIds = normalizeQuestionIds(wrongAnswerIdsByCategory[weakArea.categoryId]);
    const candidateQuestions = wrongQuestionIds.length > 0
      ? wrongQuestionIds.map((questionId) => questionLookup.get(questionId)).filter(Boolean)
      : category?.questions ?? [];

    for (const question of candidateQuestions) {
      for (const conceptTag of getQuestionConceptTags({ ...question, categoryLabel: category?.categoryLabel ?? weakArea.categoryLabel })) {
        const stat = getOrCreateConceptStat(conceptStatsByTag, conceptTag);
        stat.weakAreaSignalCount += 1;
        stat.categoryLabels.add(category?.categoryLabel ?? weakArea.categoryLabel);
      }
    }
  }

  return [...conceptStatsByTag.values()]
    .map((stat) => {
      const priorityScore = getConceptPriorityScore(stat);
      return {
        categoryLabels: [...stat.categoryLabels].sort(),
        conceptLabel: formatConceptLabel(stat.conceptTag),
        conceptTag: stat.conceptTag,
        id: stat.conceptTag,
        message: getConceptMessage(stat),
        missedQuestionCount: stat.missedQuestionCount,
        priorityScore,
        reviewSignalCount: stat.reviewSignalCount,
        weakAreaSignalCount: stat.weakAreaSignalCount
      };
    })
    .filter((stat) => stat.priorityScore > 0)
    .sort((first, second) => {
      if (second.priorityScore !== first.priorityScore) {
        return second.priorityScore - first.priorityScore;
      }

      return first.conceptLabel.localeCompare(second.conceptLabel);
    })
    .slice(0, Math.max(0, limit));
}

export function getQuestionConceptTags(question) {
  const rawTags = [
    ...(Array.isArray(question?.conceptTags) ? question.conceptTags : []),
    ...(Array.isArray(question?.conceptTag) ? question.conceptTag : []),
    ...(typeof question?.conceptTag === "string" ? [question.conceptTag] : [])
  ];

  return [...new Set(rawTags.map(normalizeConceptTag).filter(Boolean))];
}

export function formatConceptLabel(conceptTag) {
  return normalizeConceptTag(conceptTag)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getQuestionLookup(categories) {
  const questionLookup = new Map();

  for (const category of categories) {
    for (const question of category.questions ?? []) {
      questionLookup.set(question.id, {
        ...question,
        categoryId: category.categoryId,
        categoryLabel: category.categoryLabel
      });
    }
  }

  return questionLookup;
}

function getOrCreateConceptStat(conceptStatsByTag, conceptTag) {
  if (!conceptStatsByTag.has(conceptTag)) {
    conceptStatsByTag.set(conceptTag, {
      categoryLabels: new Set(),
      conceptTag,
      missedQuestionCount: 0,
      reviewSignalCount: 0,
      weakAreaSignalCount: 0
    });
  }

  return conceptStatsByTag.get(conceptTag);
}

function getConceptPriorityScore(stat) {
  return stat.missedQuestionCount * 12 + stat.reviewSignalCount * 8 + stat.weakAreaSignalCount * 5;
}

function getConceptMessage(stat) {
  const conceptLabel = formatConceptLabel(stat.conceptTag);

  if (stat.missedQuestionCount >= 2) {
    return conceptLabel + " is frequently missed";
  }

  if (stat.reviewSignalCount > 0) {
    return conceptLabel + " needs review";
  }

  return "Watch " + conceptLabel;
}

function normalizeQuestionIds(questionIds) {
  if (!Array.isArray(questionIds)) {
    return [];
  }

  return [...new Set(questionIds.filter((questionId) => typeof questionId === "string"))];
}

function normalizeConceptTag(conceptTag) {
  if (typeof conceptTag !== "string") {
    return "";
  }

  return conceptTag.trim().toLowerCase();
}
