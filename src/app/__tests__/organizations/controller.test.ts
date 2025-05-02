import request from 'supertest';
import { app } from '../../app'; // Adjust the import based on your project structure
describe('Organizations Controller', () => {
    describe('GET /organizations', () => {
        it('should return a list of organizations', async () => {
            const response = await request(app).get('/organizations');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /organizations/:id', () => {
        it('should return a single organization by ID', async () => {
            const organizationId = '1'; // Replace with a valid ID for your test
            const response = await request(app).get(`/organizations/${organizationId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', organizationId);
        });

        it('should return 404 if the organization is not found', async () => {
            const invalidId = '9999'; // Replace with an invalid ID
            const response = await request(app).get(`/organizations/${invalidId}`);
            expect(response.status).toBe(404);
        });
    });

    describe('POST /organizations', () => {
        it('should create a new organization', async () => {
            const newOrganization = {
                name: 'New Organization',
                description: 'Description of the new organization',
            };

            const response = await request(app)
                .post('/organizations')
                .send(newOrganization);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newOrganization.name);
        });

        it('should return 400 if required fields are missing', async () => {
            const invalidOrganization = {
                description: 'Missing name field',
            };

            const response = await request(app)
                .post('/organizations')
                .send(invalidOrganization);

            expect(response.status).toBe(400);
        });
    });

    describe('PUT /organizations/:id', () => {
        it('should update an existing organization', async () => {
            const organizationId = '1'; // Replace with a valid ID for your test
            const updatedData = {
                name: 'Updated Organization Name',
            };

            const response = await request(app)
                .put(`/organizations/${organizationId}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedData.name);
        });

        it('should return 404 if the organization is not found', async () => {
            const invalidId = '9999'; // Replace with an invalid ID
            const updatedData = {
                name: 'Updated Organization Name',
            };

            const response = await request(app)
                .put(`/organizations/${invalidId}`)
                .send(updatedData);

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /organizations/:id', () => {
        it('should delete an organization by ID', async () => {
            const organizationId = '1'; // Replace with a valid ID for your test
            const response = await request(app).delete(`/organizations/${organizationId}`);
            expect(response.status).toBe(204);
        });

        it('should return 404 if the organization is not found', async () => {
            const invalidId = '9999'; // Replace with an invalid ID
            const response = await request(app).delete(`/organizations/${invalidId}`);
            expect(response.status).toBe(404);
        });
    });
});