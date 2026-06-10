//compare deux chaines de caractère
function compareString(locale: string, stringA: string, stringB: string) {
    const collator = new Intl.Collator(locale);
    return collator.compare(stringA, stringB);
}

export default compareString;
