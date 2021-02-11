class ZintSnapStepByStepDescription {
    /**
     * Create step by step description
     * @param c_description_item {String} Unique CSS class of description items
     * @param board {Object} Optional board for drawings.
     */
    constructor(c_description_item, board = null) {
        this.snap = Snap;
        this.arrDiv = [];
        this.arrDiv = document.getElementsByClassName(c_description_item);
        let stepDescription = document.getElementById('step-description');
        let span = document.createElement('span');
        span.id = 'page-number';
        stepDescription.appendChild(span);

        this.arrDiv[0].style.display = 'block';
        for (let i = 1; i < this.arrDiv.length; i++) {
            this.arrDiv[i].style.display = 'none';
        }

        let divStepByStepDescription = this.arrDiv[0].parentElement;
        let divFlexRow = divStepByStepDescription.parentElement;
        let divStepByStepBlock = divFlexRow.parentElement;

        this.currentSlide;
        this.isForward = true;
        let parentOfButtons = document.createElement('div');
        parentOfButtons.classList.add('parent-of-buttons');
        let divStepByStepNavigation = document.createElement('div');
        divStepByStepNavigation.classList.add('step-navigation-div');
        parentOfButtons.appendChild(divStepByStepNavigation);
        divStepByStepBlock.appendChild(parentOfButtons);
        const buttons = {
            Backward: () => this.backward(),
            Repeat: () => this.repeat(),
            Forward: () => this.forward(),
        };

        Object.keys(buttons).forEach((key) => {
            let btn = document.createElement('button');
            btn.classList.add('big-button');
            btn.appendChild(document.createTextNode(key));
            btn.addEventListener('click', () => buttons[key](), true);
            divStepByStepNavigation.appendChild(btn);
        });

        divStepByStepNavigation = document.createElement('div');
        divStepByStepNavigation.classList.add('step-navigation-div');
        parentOfButtons.appendChild(divStepByStepNavigation);
        divStepByStepBlock.appendChild(parentOfButtons);

        // board
        this.isBoard = false;
        if (board !== null) {
            this.isBoard = true;
            // create svg element
            let elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            divFlexRow.insertBefore(elSvg, divFlexRow.childNodes[0]);
            // get snap
            this.p = new Snap(elSvg).attr({ viewBox: board.viewBox });
            this.arrSnap = board.arrSnap;
            this.steps = board.steps;

            this.steps.forEach((el) => {
                let btn = document.createElement('button');
                btn.classList.add('big-button');
                btn.style.width = 100 / this.steps.length - 1 + '%';
                btn.appendChild(document.createTextNode(el));
                btn.addEventListener('click', () => this.moveTo(el), true);
                divStepByStepNavigation.appendChild(btn);
            });
            this.svgBackgroundColor = window.getComputedStyle(elSvg).getPropertyValue('background-color');
        }
    }

    moveTo(el) {
        this.boardClear();
        this.switchDiv(this.currentSlide, el);
        if (this.isBoard) {
            this.currentSlide = el;
            this.arrSnap[this.currentSlide]();
            this.changePageNumber();
        }
    }

    start() {
        if (this.isBoard) {
            this.currentSlide = this.steps[0];
            this.arrSnap[0]();
            this.changePageNumber();
        }
    }

    forward() {
        if (this.currentSlide + 1 < this.steps.length) {
            this.boardClear();
            this.switchDiv(this.currentSlide, this.currentSlide + 1);
            this.currentSlide++;
            if (this.isBoard) {
                this.arrSnap[this.currentSlide]();
                this.changePageNumber();
            }
            this.isForward = true;
        }
    }

    backward() {
        if (this.currentSlide > 0) {
            this.boardClear();
            this.switchDiv(this.currentSlide, this.currentSlide - 1);
            this.currentSlide--;
            this.isForward = false;
            if (this.isBoard) {
                this.arrSnap[this.currentSlide]();
                this.changePageNumber();
            }
            // direction
            this.isForward = true;
        }
    }

    boardClear() {
        let viewBox = this.p.attr('viewBox');
        this.p.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height).attr({ fill: this.svgBackgroundColor });
    }

    repeat() {
        if (this.currentSlide === 0) {
            this.boardClear();
            this.start();
        } else {
            this.backward();
            this.forward();
        }
    }

    changePageNumber() {
        let pageNumber = document.getElementById('page-number');
        if (this.currentSlide > 0) {
            pageNumber.innerText = this.currentSlide;
        }

        var aTags = document.getElementsByTagName('button');
        var found;

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == pageNumber.innerText) {
                aTags[i].classList.add("active");
            } else {
                aTags[i].classList.remove("active")
            }
        }
    }
    switchDiv(indexPresent, indexNext) {
        this.arrDiv[indexPresent].style.display = 'none';
        this.arrDiv[indexNext].style.display = 'block';
    }

    drawAnimated(pathDefinition, attr_specific = ZintSnapStepByStepDescription.PEN_DEFAULT, duration = 3000, cb) {
        let shape = this.p.path(pathDefinition);
        shape.attr(attr_specific);
        if (this.isForward) {
            let pathLength = this.snap.path.getTotalLength(pathDefinition);
            var a = shape
                .attr({
                    'stroke-dasharray': pathLength + ' ' + pathLength,
                    'stroke-dashoffset': pathLength,
                })
                .animate(
                    {
                        strokeDashoffset: 0,
                    },
                    duration,
                    mina.easein,
                    cb
                );
        }
        return shape;
    }

    drawAnimatedDelay(pathDefinition, attr_specific = ZintSnapStepByStepDescription.PEN_DEFAULT, duration = 3000, delay = 0) {
        var that = this;
        setTimeout(() => {
            let shape = that.p.path(pathDefinition);
            shape.attr(attr_specific);
            // console.log(that.hasForward);
            if (that.hasForward) {
                let pathLength = that.snap.path.getTotalLength(pathDefinition);
                shape.attr({
                    'stroke-dasharray': pathLength + ' ' + pathLength,
                    'stroke-dashoffset': pathLength,
                });
                shape.animate(
                    {
                        strokeDashoffset: 0,
                    },
                    10000,
                    mina.easein
                );
            }
        }, 1000);
    }

    path(pathDefinition, className = '') {
        return this.p.path(pathDefinition).attr('class', className);
    }

    circle(x, y, r, className = '') {
        return this.p.circle(x, y, r).attr('class', className);
    }

    rect(x, y, width, height, className = '') {
        return this.p.rect(x, y, width, height).attr('class', className);
    }

    text(x, y, text, attr) {
        return this.p.text(x, y, text).attr(attr);
    }

    polygon(arr, className = '') {
        return this.p.polyline(arr).attr('class', className);
    }

    group(args) {
        return this.p.group(...args);
    }

    // .animate({ transform: 'r360,150,150' }, 1000, mina.bounce );

    static PEN_DEFAULT = {
        fill: 'none',
        stroke: 'black',
        'stroke-width': '1',
    };

    static PEN_MASTER = {
        fill: 'none',
        stroke: '#3268d2',
        'stroke-width': '1',
    };

    static PEN_HELPER = {
        fill: 'none',
        stroke: 'black',
        'stroke-width': '1',
        opacity: '0.3',
    };
}
