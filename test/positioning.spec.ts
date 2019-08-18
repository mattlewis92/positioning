import {expect} from 'chai';
import {Positioning} from '../src/positioning';

describe('Positioning', () => {

  function createElement(
    height: number, width: number, marginTop: number, marginLeft: number, isAbsolute = false): HTMLElement {
    let el = document.createElement('div');
    if (isAbsolute) {
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
    }
    el.style.display = 'inline-block';
    el.style.height = height + 'px';
    el.style.width = width + 'px';
    el.style.marginTop = marginTop + 'px';
    el.style.marginLeft = marginLeft + 'px';

    return el;
  }

  function checkPosition(el: HTMLElement, top: number, left: number) {
    const transform = el.style.transform;
    expect(transform).to.equal(`translate(${left}px, ${top}px)`);
  }

  let element, targetElement, positioning, documentMargin, bodyMargin, bodyHeight, bodyWidth;
  before(() => {
    positioning = new Positioning();
    documentMargin = document.documentElement.style.margin;
    bodyMargin = document.body.style.margin;
    bodyHeight = document.body.style.height;
    bodyWidth = document.body.style.width;

    document.documentElement.style.margin = '0';
    document.body.style.margin = '0';
  });

  after(() => {
    document.documentElement.style.margin = documentMargin;
    document.body.style.margin = bodyMargin;
  });

  beforeEach(() => {
    element = createElement(200, 300, 100, 150);
    document.body.appendChild(element);
    targetElement = createElement(50, 100, 10, 20, true);
    document.body.appendChild(targetElement);

    document.documentElement.style.margin = '0';
    document.body.style.margin = '0';
    document.body.style.height = '2000px';
    document.body.style.width = '2000px';
  });

  afterEach(() => {
    document.body.removeChild(element);
    document.body.removeChild(targetElement);
  });

  it('should calculate the element offset', () => {
    let position = positioning.offset(element);

    expect(position.height).to.equal(200);
    expect(position.width).to.equal(300);
    expect(position.top).to.equal(100);
    expect(position.bottom).to.equal(300);
    expect(position.left).to.equal(150);
    expect(position.right).to.equal(450);
  });

  it('should calculate the element offset when scrolled', () => {
    document.documentElement.scrollTop = 1000;
    document.documentElement.scrollLeft = 1000;

    let position = positioning.offset(element);

    expect(position.top).to.equal(100);
    expect(position.bottom).to.equal(300);
    expect(position.left).to.equal(150);
    expect(position.right).to.equal(450);

    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
  });

  it('should calculate the element position', () => {
    let position = positioning.position(element);

    expect(position.height).to.equal(200);
    expect(position.width).to.equal(300);
    expect(position.top).to.equal(100);
    expect(position.bottom).to.equal(300);
    expect(position.left).to.equal(150);
    expect(position.right).to.equal(450);
  });

  it('should calculate the element position when scrolled', () => {
    document.documentElement.scrollTop = 1000;
    document.documentElement.scrollLeft = 1000;

    let position = positioning.position(element);

    expect(position.top).to.equal(100);
    expect(position.bottom).to.equal(300);
    expect(position.left).to.equal(150);
    expect(position.right).to.equal(450);

    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
  });

  it('should calculate the element position on positioned ancestor', () => {
    let childElement = createElement(100, 150, 50, 75);

    element.style.position = 'relative';
    element.appendChild(childElement);

    let position = positioning.position(childElement);

    expect(position.top).to.equal(50);
    expect(position.bottom).to.equal(150);
    expect(position.left).to.equal(75);
    expect(position.right).to.equal(225);

    element.style.position = '';
    element.removeChild(childElement);
  });

  it('should position the element top-left', () => {

    let isInViewport = positioning.positionElements(element, targetElement, 'top-left');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 40, 150);
  });

  it('should position the element top-center', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'top');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 40, 250);
  });

  it('should position the element top-right', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'top-right');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 40, 350);
  });

  it('should position the element bottom-left', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'bottom-left');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 300, 150);
  });

  it('should position the element bottom-center', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'bottom');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 300, 250);
  });

  it('should position the element bottom-right', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'bottom-right');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 300, 350);
  });

  it('should position the element left-top', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'left-top');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 100, 30);
  });

  it('should position the element left-center', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'left');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 175, 30);
  });

  it('should position the element left-bottom', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'left-bottom');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 250, 30);
  });

  it('should position the element right-top', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'right-top');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 100, 450);
  });

  it('should position the element right-center', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'right');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 175, 450);
  });

  it('should position the element right-bottom', () => {
    let isInViewport = positioning.positionElements(element, targetElement, 'right-bottom');

    expect(isInViewport).to.equal(true);
    checkPosition(targetElement, 250, 450);
  });

});
