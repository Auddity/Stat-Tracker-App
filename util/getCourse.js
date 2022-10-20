const url = './api/courses.json';

const getCourseDetails = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch(err) {
    console.log(err)
  }
}

export const getYardage = async (x, y) => {
  const courseData = await getCourseDetails();
  let yards = courseData[0].yardages.mens;
  // console.log(yards);
  return yards;
}

