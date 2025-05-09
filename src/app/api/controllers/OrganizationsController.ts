import { NextRequest, NextResponse } from "next/server";
import kt_organizationsService from "../services/OrganizationsService";
import kt_organizations from "../models/Organizations";

class kt_organizationsController {
    private kt_organizationsService: kt_organizationsService;

    constructor() {
        this.kt_organizationsService = new kt_organizationsService();
    }

    public async getAllOrganizations(req: NextRequest): Promise<NextResponse> {
        try {
            const organizations = await this.kt_organizationsService.getAll();
            return NextResponse.json(organizations, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all organizations:', error);
            return NextResponse.json({ message: 'Failed to retrieve organizations.' }, { status: 500 });
        }
    }

    public async getOrganizationById(req: NextRequest, id: number): Promise<NextResponse> {
        if (isNaN(id)) {
            return NextResponse.json({ message: 'Invalid organization ID.' }, { status: 400 });
        }

        try {
            const organization = await this.kt_organizationsService.getById(id);
            if (!organization) {
                return NextResponse.json({ message: 'Organization not found.' }, { status: 404 });
            }
            return NextResponse.json(organization, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve organization by ID:', error);
            return NextResponse.json({ message: 'Failed to retrieve the organization.' }, { status: 500 });
        }
    }

    public async createOrganization(req: NextRequest, body: Partial<kt_organizations>): Promise<NextResponse> {
        const orgData = body;

        if (!orgData.name?.trim()) {
            return NextResponse.json({ message: 'Missing organization name.' }, { status: 400 });
        }

        try {
            const created = await this.kt_organizationsService.create(orgData);
            if (!created) {
                return NextResponse.json({ message: 'Failed to create the organization.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Organization successfully created.' }, { status: 201 });
        } catch (error) {
            console.error('Failed to create organization:', error);
            return NextResponse.json({ message: 'Failed to create the organization.' }, { status: 500 });
        }
    }

    public async updateOrganization(req: NextRequest, id: number, newData: Partial<kt_organizations>): Promise<NextResponse> {
        if (isNaN(id)) {
            return NextResponse.json({ message: 'Invalid organization ID.' }, { status: 400 });
        }

        try {
            const updated = await this.kt_organizationsService.update(id, newData);
            if (!updated) {
                return NextResponse.json({ message: 'Failed to update the organization.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Organization successfully updated.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to update organization:', error);
            return NextResponse.json({ message: 'Failed to update the organization.' }, { status: 500 });
        }
    }

    public async deleteOrganization(req: NextRequest, id: number): Promise<NextResponse> {
        if (isNaN(id)) {
            return NextResponse.json({ message: 'Invalid organization ID.' }, { status: 400 });
        }

        try {
            const deleted = await this.kt_organizationsService.delete(id);
            if (!deleted) {
                return NextResponse.json({ message: 'Failed to delete the organization.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Organization successfully deleted.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to delete organization:', error);
            return NextResponse.json({ message: 'Failed to delete the organization.' }, { status: 500 });
        }
    }
}

export default kt_organizationsController;
