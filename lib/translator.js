import { translate } from '@vitalets/google-translate-api';

/**
 * Translate text into one or more target languages.
 * @param {string} text - The text to translate.
 * @param {string[]} languages - Array of language codes (e.g. ['de', 'fr']).
 * @returns {Object} - Object with language codes as keys and translated text.
 */
export const translateText = async (text, languages = ['de']) => {
    const translations = {};

    for (const lang of languages) {
        const res = await translate(text, { to: lang });
        translations[lang] = res.text;
    }

    return translations;
};
