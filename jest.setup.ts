jest.mock("mysql2/promise", () => ({
    __esModule: true,
    createConnection: jest.fn().mockResolvedValue({
        query: jest.fn().mockResolvedValue([]),
        end: jest.fn().mockResolvedValue(null),
    }),
}));

jest.mock("@/utils/executeQuery", () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue([]),
}));