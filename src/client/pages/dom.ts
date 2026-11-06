/**
 * Gets an element that the page markup must contain.
 * Throws instead of returning null: a missing element is a broken page, not a case to handle.
 */
export function getRequiredElement(id: string): HTMLElement {
    var element = document.getElementById(id);

    if (element === null) {
        throw new Error('required element #' + id + ' is missing in the page');
    }

    return element;
}
