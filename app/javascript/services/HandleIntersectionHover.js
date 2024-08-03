export function handleIntersectionHover(event, ghostStone) {
    const x = event.target.cx.baseVal.value;
    const y = event.target.cy.baseVal.value;

    ghostStone.setAttribute('cx', x);
    ghostStone.setAttribute('cy', y);
    ghostStone.setAttribute('visibility', 'visible');
}
