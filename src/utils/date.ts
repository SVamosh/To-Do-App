
const MONTHS = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
];

export const formatDate = (date: Date = new Date()): string => {
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} года`;
};

