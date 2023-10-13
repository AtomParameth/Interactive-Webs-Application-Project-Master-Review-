export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1920, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const postersData = [
    {
        className: "poster",
        id: 1,
        imageUrl: require("./images/poster_attack-on-titan.png"),
        name: "Attack on Titan",
        describe: "description of series"
    },
    {
        className: "poster",
        id: 2,
        imageUrl: require("./images/poster_one-piece.png"),
        name: "One Piece",
        describe: "description of series"
    },
    {
        className: "poster",
        id: 3,
        imageUrl: require("./images/poster_the-continental.png"),
        name: "The Continental",
        describe: "description of series"
    },
    {
        className: "poster",
        id: 4,
        imageUrl: require("./images/poster_the-nun-ii-2.png"),
        name: "The Nun 2",
        describe: "description of series"
    },
    {
        className: "poster",
        id: 5,
        imageUrl: require("./images/poster_guardians-of-the-galaxy.png"),
        name: "Guardians of The Galaxy",
        describe: "description of series"
    }
];