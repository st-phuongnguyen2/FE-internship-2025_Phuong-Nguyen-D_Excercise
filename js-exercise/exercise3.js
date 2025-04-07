function paginate(totalPages, currentPage) {
  if (currentPage > totalPages) {
    throw new Error('Invalid current page number');
  }

  const maxDisplay = 7;
  const maxMargin = 4;

  const rightDistance = Math.abs(totalPages - currentPage);
  const leftDistance = Math.abs(1 - currentPage);

  const pagination = [];

  if (totalPages > maxDisplay) {
    if (rightDistance < leftDistance && rightDistance < maxMargin) {
      pagination.push({ page: 1, isCurrent: false, showDots: false });
      pagination.push({ page: '...', isCurrent: false, showDots: true });

      for (let i = 2; i < maxDisplay; i++) {
        pagination.push({
          page: i,
          isCurrent: currentPage === i,
          showDots: false
        });
      }
    } else if (leftDistance < rightDistance && leftDistance < maxMargin) {
      for (let i = 1; i <= maxDisplay - 2; i++) {
        pagination.push({
          page: i,
          isCurrent: currentPage === i,
          showDots: false
        });
      }

      pagination.push({ page: '...', isCurrent: false, showDots: true });
      pagination.push({
        page: totalPages,
        isCurrent: false,
        showDots: false
      });
    } else {
      pagination.push({ page: 1, isCurrent: false, showDots: false });
      pagination.push({ page: '...', isCurrent: false, showDots: true });

      for (let i = 0; i < maxDisplay - 4; i++) {
        const page = currentPage - 1 + i;
        pagination.push({
          page,
          isCurrent: page === currentPage,
          showDots: false
        });
      }

      pagination.push({ page: '...', isCurrent: false, showDots: true });
      pagination.push({
        page: totalPages,
        isCurrent: false,
        showDots: false
      });
    }
  } else {
    return Array.from({ length: totalPages }, (item, i) => {
      return {
        page: i + 1,
        isCurrent: currentPage === i + 1,
        showDot: false
      };
    });
  }

  return pagination;
}

console.log('exercise 3:', paginate(3, 2));
