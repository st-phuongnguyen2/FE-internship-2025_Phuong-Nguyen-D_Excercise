function paginate(totalPages, currentPage) {
  if (currentPage > totalPages) {
    throw new Error('Invalid current page number');
  }

  const maxDisplay = 7;
  const maxMargin = maxDisplay - 2;

  const rightDistance = Math.abs(totalPages - currentPage);
  const leftDistance = Math.abs(1 - currentPage);

  if (totalPages >= maxDisplay) {
    if (rightDistance < leftDistance && rightDistance <= maxMargin) {
      console.log('HERE rightDistance');
      return Array.from({ length: maxDisplay }, (item, i) => {
        if (i >= 2) {
          const page = totalPages - maxMargin - 1 + i;
          return {
            page,
            isCurrent: currentPage === page,
            showDot: false
          };
        } else {
          return {
            page: totalPages > maxDisplay && i === 1 ? '...' : i + 1,
            isCurrent: currentPage === i + 1,
            showDot: totalPages > maxDisplay && i === 1 ? true : false
          };
        }
      });
    } else if (leftDistance < rightDistance && leftDistance <= maxMargin) {
      console.log('HERE leftDistance');
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
          return {
            page:
              totalPages > maxDisplay && i === maxDisplay - 2 ? '...' : i + 1,
            isCurrent: currentPage === i + 1,
            showDot:
              totalPages > maxDisplay && i === maxDisplay - 2 ? true : false
          };
        }
      });
    } else {
      console.log('HERE middle');
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

console.log('exercise 3:', paginate(15, 3));
