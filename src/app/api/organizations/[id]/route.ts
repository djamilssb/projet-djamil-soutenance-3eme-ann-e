import { NextRequest } from "next/server";
import OrganizationsController from "../../controllers/OrganizationsController";

const organizationsController = new OrganizationsController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const orgaId = parseInt(id, 10);

    return await organizationsController.getOrganizationById(req, orgaId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const orgaId = parseInt(id, 10);
    const newData = await req.json();

    return await organizationsController.updateOrganization(req, orgaId, newData);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const orgaId = parseInt(id, 10);

    return await organizationsController.deleteOrganization(req, orgaId);
}
