import Departement from "../../api/models/Departement";

describe('Departement', () => {
  describe('constructor', () => {
    test('devrait initialiser un objet vide quand aucun paramètre', () => {
      const departement = new Departement();
      
      expect(departement.getId()).toBeUndefined();
      expect(departement.getName()).toBeUndefined();
      expect(departement.getDepartementNumber()).toBeUndefined();
    });

    test('devrait initialiser avec les données fournies', () => {
      const data = { 
        id: 1, 
        name: 'Paris', 
        departement_number: '75' 
      };
      const departement = new Departement(data);
      
      expect(departement.getId()).toBe(1);
      expect(departement.getName()).toBe('Paris');
      expect(departement.getDepartementNumber()).toBe('75');
    });
    
    test('devrait initialiser avec des données partielles', () => {
      const data = { name: 'Paris' };
      const departement = new Departement(data);
      
      expect(departement.getId()).toBeUndefined();
      expect(departement.getName()).toBe('Paris');
      expect(departement.getDepartementNumber()).toBeUndefined();
    });
  });

  describe('getters', () => {
    test('getId devrait retourner la valeur correcte', () => {
      const departement = new Departement({ id: 42 });
      expect(departement.getId()).toBe(42);
    });

    test('getName devrait retourner la valeur correcte', () => {
      const departement = new Departement({ name: 'Gironde' });
      expect(departement.getName()).toBe('Gironde');
    });

    test('getDepartementNumber devrait retourner la valeur correcte', () => {
      const departement = new Departement({ departement_number: '33' });
      expect(departement.getDepartementNumber()).toBe('33');
    });
  });

  describe('setters', () => {
    test('setId devrait définir correctement la valeur', () => {
      const departement = new Departement();
      departement.setId(42);
      expect(departement.getId()).toBe(42);
    });

    test('setName devrait définir correctement la valeur', () => {
      const departement = new Departement();
      departement.setName('Gironde');
      expect(departement.getName()).toBe('Gironde');
    });

    test('setDepartementNumber devrait définir correctement la valeur', () => {
      const departement = new Departement();
      departement.setDepartementNumber('33');
      expect(departement.getDepartementNumber()).toBe('33');
    });
  });

  describe('toJSON', () => {
    test('devrait retourner un objet avec toutes les propriétés', () => {
      const departement = new Departement({
        id: 1,
        name: 'Paris',
        departement_number: '75'
      });
      
      const json = departement.toJSON();
      
      expect(json).toEqual({
        id: 1,
        name: 'Paris',
        departement_number: '75'
      });
    });
    
    test('devrait retourner un objet avec des propriétés undefined quand non définies', () => {
      const departement = new Departement({ name: 'Paris' });
      
      const json = departement.toJSON();
      
      expect(json).toEqual({
        id: undefined,
        name: 'Paris',
        departement_number: undefined
      });
    });
  });
});