import { NextRequest, NextResponse } from "next/server";
import DepartementService from "../services/DepartementService";

class DepartementController {
    private departementService: DepartementService;

    constructor() {
        this.departementService = new DepartementService();
    }

    public async getAll(req: NextRequest): Promise<NextResponse> {
        try {
            const departements = await this.departementService.getAll();
            return NextResponse.json(departements.length > 0 ? departements : [], { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all departements:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les départements.' }, { status: 500 });
        }
    }

    public async getById(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID département invalide.' }, { status: 400 });
        }

        try {
            const departement = await this.departementService.getById(id);
            if (!departement) {
                return NextResponse.json({ message: 'Département introuvable.' }, { status: 404 });
            }
            return NextResponse.json(departement, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve departement with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de récupérer le département.' }, { status: 500 });
        }
    }

    public async getByNumber(req: NextRequest, number: string): Promise<NextResponse> {
        if (!number) {
            return NextResponse.json({ message: 'Numéro de département invalide.' }, { status: 400 });
        }

        try {
            const departement = await this.departementService.getByDepartementNumber(number);
            if (!departement) {
                return NextResponse.json({ message: 'Département introuvable.' }, { status: 404 });
            }
            return NextResponse.json(departement, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve departement with number ${number}:`, error);
            return NextResponse.json({ message: 'Impossible de récupérer le département.' }, { status: 500 });
        }
    }

    public async create(req: NextRequest, body: any): Promise<NextResponse> {
        try {
            const created = await this.departementService.create(body);
            if (!created) {
                return NextResponse.json({ message: 'Échec de la création du département.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Département créé avec succès.' }, { status: 201 });
        } catch (error) {
            console.error('Failed to create departement:', error);
            return NextResponse.json({ message: 'Impossible de créer le département.' }, { status: 500 });
        }
    }

    public async update(req: NextRequest, id: number, body: any): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID département invalide.' }, { status: 400 });
        }

        try {
            const updated = await this.departementService.update(id, body);
            if (!updated) {
                return NextResponse.json({ message: 'Échec de la mise à jour du département.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Département mis à jour avec succès.' }, { status: 200 });
        } catch (error) {
            console.error(`Failed to update departement with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de mettre à jour le département.' }, { status: 500 });
        }
    }

    public async delete(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID département invalide.' }, { status: 400 });
        }

        try {
            const deleted = await this.departementService.delete(id);
            if (!deleted) {
                return NextResponse.json({ message: 'Échec de la suppression du département.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Département supprimé avec succès.' }, { status: 200 });
        } catch (error) {
            console.error(`Failed to delete departement with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de supprimer le département.' }, { status: 500 });
        }
    }
}

export default DepartementController;