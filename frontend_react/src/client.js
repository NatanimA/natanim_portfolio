import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'jaapt5nh',
    dataset:'production',
    apiVersion:'2023-03-14',
    useCdn: true,
    token: 'skQMl4QSLVUHbIyKFK6MqqDApmdU0IZYDpp3JSUa1q8asI4fA8WaxOgrPvrvOfp1FIQDuhspP0ujspNgzQL0PEHsPz0kVSklNJmFApur771rPz1rZe4FfkICHwBqznE71v0NrcG9TWVN1LqkZoXo2ywQK570VqSz8BAQgaqfyfBIt3cWTa6P'
});

const builder = imageUrlBuilder(client)

export const urlForm = (source) => builder.image(source);
