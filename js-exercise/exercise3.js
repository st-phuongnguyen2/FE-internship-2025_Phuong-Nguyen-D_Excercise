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
      console.log('HERE rightDistance and three dots on the left');
      pagination.push({ page: 1, isCurrent: false, showDots: false });
      pagination.push({ page: '...', isCurrent: false, showDots: true });

      for (let i = 0; i < maxDisplay - 2; i++) {
        const page = totalPages - 4 + i;
        pagination.push({
          page,
          isCurrent: currentPage === page,
          showDots: false
        });
      }
    } else if (leftDistance < rightDistance && leftDistance < maxMargin) {
      console.log('HERE leftDistance and three dots on the right');
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
      console.log('HERE middle and three dots on both left and right side');
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

console.log('exercise 3:', paginate(9, 3));
