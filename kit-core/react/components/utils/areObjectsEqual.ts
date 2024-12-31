/* eslint-disable @typescript-eslint/no-explicit-any */

export const areObjectsEqual = (
  a: Record<string, any> | undefined,
  b: Record<string, any> | undefined,
): boolean => {
  if (!a || !b) {
    return false;
  }
  // Obtener las claves de ambos objetos
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Verificar que tengan las mismas claves
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Verificar que cada clave tenga el mismo valor en ambos objetos
  for (const key of keysA) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};
