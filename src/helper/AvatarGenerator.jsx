export const getAvatarUrl = (name) => {
    const baseUrl = "https://ui-avatars.com/api/";
    const background = "762dbf";
    const color = "fff";
    const bold = true;

    return `${baseUrl}?background=${background}&color=${color}&bold=${bold}&name=${encodeURIComponent(name)}`;
};
