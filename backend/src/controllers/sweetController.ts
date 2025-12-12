import { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import { sweetService } from '../services/sweetService';

export const createSweetValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

export const updateSweetValidators = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

export const purchaseSweetValidators = [
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

export const restockSweetValidators = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

export const searchSweetsValidators = [
  query('name').optional().trim(),
  query('category').optional().trim(),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('minPrice must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('maxPrice must be a positive number'),
];

export const createSweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllSweets = async (req: Request, res: Response): Promise<void> => {
  try {
    const sweets = await sweetService.getAllSweets();
    res.json(sweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSweetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const sweet = await sweetService.getSweetById(id);
    
    if (!sweet) {
      res.status(404).json({ error: 'Sweet not found' });
      return;
    }

    res.json(sweet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id);
    const sweet = await sweetService.updateSweet(id, req.body);
    res.json(sweet);
  } catch (error: any) {
    if (error.message === 'Sweet not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const deleteSweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await sweetService.deleteSweet(id);
    res.json({ message: 'Sweet deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Sweet not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const searchSweets = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, category, minPrice, maxPrice } = req.query;
    const params = {
      name: name as string | undefined,
      category: category as string | undefined,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
    };

    const sweets = await sweetService.searchSweets(params);
    res.json(sweets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const purchaseSweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id);
    const quantity = req.body.quantity || 1;
    const sweet = await sweetService.purchaseSweet(id, quantity);
    res.json({ message: 'Purchase successful', sweet });
  } catch (error: any) {
    if (error.message === 'Sweet not found') {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Insufficient quantity in stock') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const restockSweet = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await sweetService.restockSweet(id, quantity);
    res.json({ message: 'Restock successful', sweet });
  } catch (error: any) {
    if (error.message === 'Sweet not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

