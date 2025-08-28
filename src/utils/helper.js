export const getValidAnswers = (userAnswers, errors) =>
  Object.fromEntries(
    Object.entries(userAnswers).filter(([fieldId, value]) => {
      if (errors[fieldId]) return false;
      if (value === undefined || value === '') return false;
      return true;
    })
  );

export const getErrorMessage = (widget) => {
  if (widget === 'choice') return "Please select a choice";
  if (widget === 'text') return "Please enter an answer";
  if (widget === 'integer') return "Please enter a valid number";
  return "";
};

export const getFirstInvalidFieldIndex = (formLabels, userAnswers, errors) => {
  for (let i = 0; i < formLabels.length; i++) {
    const field = formLabels[i];
    // Check if this field is NOT in userAnswers or if there's an error
    if (!userAnswers[field.id] || errors[field.id]) {
      return i;
    }
  }
  return -1;
};


export const scrollToAndFocusElement = (element) => {
  if (!element) {
    return;
  }

  const start = window.scrollY;
  // Calculate the target scroll position to center the element
  const end =
    element.getBoundingClientRect().top +
    window.scrollY -
    window.innerHeight / 2 +
    element.offsetHeight / 2;
  const duration = 500; // Animation duration in milliseconds
  let startTime = null;

  const animateScroll = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo(0, start + (end - start) * progress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      element.focus(); // Focus the element after scrolling completes
    }
  };

  requestAnimationFrame(animateScroll);
};