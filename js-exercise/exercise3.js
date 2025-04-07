function paginate(totalPages, currentPage) {
  if (currentPage > totalPages) {
    throw new Error('Invalid current page number');
  }

  const maxDisplay = 7;
  const maxMargin = maxDisplay - 3;

  const rightDistance = Math.abs(totalPages - currentPage);
  const leftDistance = Math.abs(1 - currentPage);

  if (totalPages >= maxDisplay) {
    if (rightDistance < leftDistance && rightDistance < maxMargin) {
      console.log('HERE rightDistance and three dots on the left');
      return Array.from({ length: maxDisplay }, (item, i) => {
        if (i >= 2) {
          const page = totalPages - maxMargin - 1 + i;
          return {
            page,
            isCurrent: currentPage === page,
            showDot: false
          };
        } else {
          const isDot = totalPages > maxDisplay && i === 1;
          return {
            page: isDot ? '...' : i + 1,
            isCurrent: false,
            showDot: isDot === 1
          };
        }
      });
    } else if (leftDistance < rightDistance && leftDistance < maxMargin) {
      console.log('HERE leftDistance and three dots on the right');
      return Array.from({ length: maxDisplay }, (item, i) => {
        if (i === 0) {
          return {
            page: 1,
            isCurrent: currentPage === 1,
            showDot: false
          };
        } else if (i === maxDisplay - 1) {
          return {
            page: totalPages,
            isCurrent: currentPage === totalPages,
            showDot: false
          };
        } else {
          const isDot = totalPages > maxDisplay && i === maxDisplay - 2;
          return {
            page: isDot ? '...' : i + 1,
            isCurrent: currentPage === i + 1,
            showDot: isDot
          };
        }
      });
    } else {
      console.log('HERE middle and three dots on both left and right side');
      return Array.from({ length: maxDisplay }, (item, i) => {
        if (i === 0) {
          return {
            page: 1,
            isCurrent: currentPage === 1,
            showDot: false
          };
        } else if (i === maxDisplay - 1) {
          return {
            page: totalPages,
            isCurrent: currentPage === totalPages,
            showDot: false
          };
        } else if (i === 1 || i === maxDisplay - 2) {
          return {
            page: '...',
            isCurrent: false,
            showDot: true
          };
        } else {
          const page = currentPage - 3 + i;
          return {
            page,
            isCurrent: currentPage === page,
            showDot: false
          };
        }
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
}

console.log('exercise 3:', paginate(10, 4));
