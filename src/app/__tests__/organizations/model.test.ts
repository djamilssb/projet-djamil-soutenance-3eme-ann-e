import kt_organizations from "@/app/api/models/Organizations";

describe("kt_organizations Model", () => {
    it("should correctly initialize and return properties", () => {
        const organization = new kt_organizations({
            id: 1,
            name: "Test Organization",
            email: "test@example.com",
            phone_number: "123456789",
            about_us: "We are a test organization.",
            created_at: new Date("2023-01-01"),
        });

        expect(organization.getId()).toBe(1);
        expect(organization.getName()).toBe("Test Organization");
        expect(organization.getEmail()).toBe("test@example.com");
        expect(organization.getPhoneNumber()).toBe("123456789");
        expect(organization.getAboutUs()).toBe("We are a test organization.");
        expect(organization.getCreatedAt()).toEqual(new Date("2023-01-01"));
    });

    it("should correctly set properties", () => {
        const organization = new kt_organizations();

        organization.setId(2);
        organization.setName("Updated Organization");
        organization.setEmail("updated@example.com");
        organization.setPhoneNumber("987654321");
        organization.setAboutUs("Updated about us.");
        organization.setCreatedAt(new Date("2023-02-01"));

        expect(organization.getId()).toBe(2);
        expect(organization.getName()).toBe("Updated Organization");
        expect(organization.getEmail()).toBe("updated@example.com");
        expect(organization.getPhoneNumber()).toBe("987654321");
        expect(organization.getAboutUs()).toBe("Updated about us.");
        expect(organization.getCreatedAt()).toEqual(new Date("2023-02-01"));
    });
});