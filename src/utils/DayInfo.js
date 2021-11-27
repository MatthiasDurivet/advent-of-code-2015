const infoPerDay = {
    1: { title: "Not Quite Lisp", description: "Santa is trying to deliver presents in a large apartment building, but he can't find the right floor - the directions he got are a little confusing. He starts on the ground floor (floor 0) and then follows the instructions one character at a time." },
    2: { title: "I Was Told There Would Be No Math", description: "The elves are running low on wrapping paper, and so they need to submit an order for more. They have a list of the dimensions (length l, width w, and height h) of each present, and only want to order exactly as much as they need." },
    3: { title: "Unknown", description: "Coming soon" },
    4: { title: "Unknown", description: "Coming soon" },
    5: { title: "Unknown", description: "Coming soon" },
    6: { title: "Unknown", description: "Coming soon" },
    7: { title: "Unknown", description: "Coming soon" },
    8: { title: "Unknown", description: "Coming soon" },
    9: { title: "Unknown", description: "Coming soon" },
    10: { title: "Unknown", description: "Coming soon" },
    11: { title: "Unknown", description: "Coming soon" },
    12: { title: "Unknown", description: "Coming soon" },
    13: { title: "Unknown", description: "Coming soon" },
    14: { title: "Unknown", description: "Coming soon" },
    15: { title: "Unknown", description: "Coming soon" },
    16: { title: "Unknown", description: "Coming soon" },
    17: { title: "Unknown", description: "Coming soon" },
    18: { title: "Unknown", description: "Coming soon" },
    19: { title: "Unknown", description: "Coming soon" },
    20: { title: "Unknown", description: "Coming soon" },
    21: { title: "Unknown", description: "Coming soon" },
    22: { title: "Unknown", description: "Coming soon" },
    23: { title: "Unknown", description: "Coming soon" },
    24: { title: "Unknown", description: "Coming soon" },
    25: { title: "Unknown", description: "Coming soon" },
    26: { title: "Unknown", description: "Coming soon" },
    27: { title: "Unknown", description: "Coming soon" },
    28: { title: "Unknown", description: "Coming soon" },
    29: { title: "Unknown", description: "Coming soon" },
    30: { title: "Unknown", description: "Coming soon" },
    31: { title: "Unknown", description: "Coming soon" },
}

const getDayInfo = dayNumber => infoPerDay[dayNumber]
const getAllDayNumbers = () => Object.keys(infoPerDay)

export { getAllDayNumbers, getDayInfo }