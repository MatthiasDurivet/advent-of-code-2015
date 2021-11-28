const infoPerDay = {
    2: { title: "I Was Told There Would Be No Math", description: "Help the elves with wrapping gifts." },
    3: { title: "Perfectly Spherical Houses in a Vacuum", description: "Santa is delivering presents to an infinite two-dimensional grid of houses." },
    // 6: { title: "Probably a Fire Hazard", description: "One million lights in a 1000x1000 grid. Santa has mailed you instructions on how to display the ideal lighting configuration.   " },
    // 0: { title: "Unknown", description: "Coming soon" },
}

const getDayInfo = dayNumber => infoPerDay[dayNumber]
const getAllDayNumbers = () => Object.keys(infoPerDay)

export { getAllDayNumbers, getDayInfo }