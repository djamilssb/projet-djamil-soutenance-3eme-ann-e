import { NextRequest } from "next/server";
import OrganizationsController from "../controllers/OrganizationsController";

const organizationsController = new OrganizationsController();

export async function GET(req: NextRequest) {
    return organizationsController.getAllOrganizations(req);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newOrganization = body;

    return await organizationsController.createOrganization(req, newOrganization);
}
