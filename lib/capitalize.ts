// utils/capitalize.ts

export function capitalizeFirstLetter(name: string | undefined): string {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function capitalizeFullName(name: string | undefined): string {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}
