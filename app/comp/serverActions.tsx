// serverActions.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ingredient Actions
export const createIngredient = async (name: string) => {
  return await prisma.ingredient.create({
    data: { name },
  });
};

export const getIngredients = async () => {
  return await prisma.ingredient.findMany({
    include: { tags: true }, // Include related tags if needed
  });
};

export const updateIngredient = async (id: number, name: string) => {
  return await prisma.ingredient.update({
    where: { id },
    data: { name },
  });
};

export const deleteIngredient = async (id: number) => {
  return await prisma.ingredient.delete({
    where: { id },
  });
};

// Tag Actions
export const createTag = async (name: string) => {
  return await prisma.tag.create({
    data: { name },
  });
};

export const getTags = async () => {
  return await prisma.tag.findMany({
    include: { ingredients: true, recipes: true }, // Include related ingredients and recipes if needed
  });
};

export const updateTag = async (id: number, name: string) => {
  return await prisma.tag.update({
    where: { id },
    data: { name },
  });
};

export const deleteTag = async (id: number) => {
  return await prisma.tag.delete({
    where: { id },
  });
};

// Recipe Actions
export const createRecipe = async (name: string, steps: string) => {
  return await prisma.recipe.create({
    data: { name, steps },
  });
};

export const getRecipes = async () => {
  return await prisma.recipe.findMany({
    include: { tags: true, CookingStep: true }, // Include related tags and cooking steps if needed
  });
};

export const updateRecipe = async (id: number, name: string, steps: string) => {
  return await prisma.recipe.update({
    where: { id },
    data: { name, steps },
  });
};

export const deleteRecipe = async (id: number) => {
  return await prisma.recipe.delete({
    where: { id },
  });
};

// CookingMethod Actions
export const createCookingMethod = async (name: string) => {
  return await prisma.cookingMethod.create({
    data: { name },
  });
};

export const getCookingMethods = async () => {
  return await prisma.cookingMethod.findMany();
};

export const updateCookingMethod = async (id: number, name: string) => {
  return await prisma.cookingMethod.update({
    where: { id },
    data: { name },
  });
};

export const deleteCookingMethod = async (id: number) => {
  return await prisma.cookingMethod.delete({
    where: { id },
  });
};

// CookingStep Actions
export const createCookingStep = async (template: string, stepOrder: number, recipeId?: number) => {
  return await prisma.cookingStep.create({
    data: { template, stepOrder, recipeId },
  });
};

export const getCookingSteps = async () => {
  return await prisma.cookingStep.findMany({
    include: { recipe: true }, // Include related recipe if needed
  });
};

export const updateCookingStep = async (id: number, template: string, stepOrder: number) => {
  return await prisma.cookingStep.update({
    where: { id },
    data: { template, stepOrder },
  });
};

export const deleteCookingStep = async (id: number) => {
  return await prisma.cookingStep.delete({
    where: { id },
  });
};

// Export all actions for use in your application
export default {
  createIngredient,
  getIngredients,
  updateIngredient,
  deleteIngredient,
  createTag,
  getTags,
  updateTag,
  deleteTag,
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  createCookingMethod,
  getCookingMethods,
  updateCookingMethod,
  deleteCookingMethod,
  createCookingStep,
  getCookingSteps,
  updateCookingStep,
  deleteCookingStep,
};