export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncatedText = text.slice(0, maxLength);
    return truncatedText.slice(0, truncatedText.lastIndexOf(' ')) + '...';
  };