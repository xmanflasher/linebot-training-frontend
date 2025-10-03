// src/mocks/mockTeamData.js
export const mockTeamData = [
    {
        id: 'TEAM001',
        name: 'WeekendFighters',
        members: [
            "UID001", "UID002", "UID003", "UID004", "UID005", "UID006", "UID007",
            "UID008", "UID009", "UID010", "UID011", "UID012", "UID013", "UID014",
            "UID015", "UID016", "UID017", "UID018", "UID019", "UID020", "UID021",
            "UID022", "UID023"
        ],
        isPublic: true,
        isTemp: false,
        //createdAt: Timestamp,
        createdAt: new Date("2025-01-15T10:30:00Z"),
        createdBy: 'UID001'
    },
    {
        id: 'TEAM002',
        name: 'CT50+',
        members: [
            "UID007", "UID009", "UID013", "UID014", "UID015", "UID016", "UID017", "UID018"
        ],
        isPublic: true,
        isTemp: false,
        //createdAt: Timestamp,
        createdAt: new Date("2025-01-15T10:30:00Z"),
        createdBy: 'UID007'
    },
    {
        id: 'TEAM003',
        name: 'TestTeam',
        members: [
            "UID007", "UID009"
        ],
        isPublic: true,
        isTemp: false,
        //createdAt: Timestamp,
        createdAt: new Date("2025-01-15T10:30:00Z"),
        createdBy: 'UID007'
    },
];