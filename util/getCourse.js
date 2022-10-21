const URL = './api/courses.json';

const getCourseData = async () => {
  try {
    const data = await fetch(URL);
    const res = await data.json();
    return res;
  } catch(err) {
    console.log(err)
  }
}

// When I determine if details will be parsed in this module or elsewhere REMEMBER to update my Obsidian note "Gotcha With Using Modules"
export const courseDetails = async () => {
  const courseData = await getCourseData();
  const mensYards = courseData.courses[0].yardages.mens;
  const ladiesYards = courseData.courses[0].yardages.ladies;
  return courseData
}

