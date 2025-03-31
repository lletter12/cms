/** @type {import('next-i18next').UserConfig} */
module.exports = {
    locales: ['en', 'ko', 'jp'], // 지원하는 언어 목록
    defaultLocale: 'ko',   // 기본 언어 설정
    messages: {
        en: './public/locales/en/*.json',
        ko: './public/locales/ko/*.json',
        jp: './public/locales/jp/*.json',
    },
}