export const formtURLToCamelCase = (url: string): string => {
  let cleanedUrl = url.split('?')[0];

  cleanedUrl = cleanedUrl.replace(/[-/](\w)/g, (_, p1) => {
    return p1.toUpperCase();
  });
  cleanedUrl = cleanedUrl.charAt(0).toUpperCase() + cleanedUrl.slice(1);

  return cleanedUrl;
};
