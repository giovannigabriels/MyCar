export const diffTime = (comment) => {
    let different;
    const givenDate = new Date(comment.createdAt);
    const now = new Date();
    
    const timeDifferenceInMilliseconds = now - givenDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    
    if (timeDifferenceInSeconds < 60) {
      different = "Just now"
    } else if (timeDifferenceInSeconds < 3600) {
      const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
      different = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`
    } else if (timeDifferenceInSeconds < 86400) {
      const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
      different = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`
    }
    return different
  };