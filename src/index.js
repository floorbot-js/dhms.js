const FULLNAMES = { ms: 'milisecond', s: 'second', m: 'minute', h: 'hour', d: 'day', M: 'month', y: 'year' }

module.exports = class DHMS {

    constructor(time) {
        this.time = time instanceof Date ? Date.getTime() : time;

        this.ms = Math.floor(this.time % 1000);
        this.s = Math.floor(this.time / 1000 % 60);
        this.m = Math.floor(this.time / 1000 / 60 % 60);
        this.h = Math.floor(this.time / 1000 / 60 / 60 % 24);
        this.d = Math.floor(this.time / 1000 / 60 / 60 / 24 % (365 / 12));
        this.M = Math.floor(this.time / 1000 / 60 / 60 / 24 / (365 / 12) % 12);
        this.y = Math.floor(this.time / 1000 / 60 / 60 / 24 / (365 / 12) / 12);
    }

    print(options = {}) {
        options = Object.assign({
            fullname: false, // Minutes or m
            hideZero: true, // Remove properties of zero
            limit: 0, // Sets the number of significance to show
            trim: 0 // Trim the lowest units
        }, options);

        const dhms = { ms: this.ms, s: this.s, m: this.m, h: this.h, d: this.d, M: this.M, y: this.y }

        if (options.trim) { for (let i = 0, keys = Object.keys(dhms); i < options.trim; i++) { delete dhms[keys[i]]; } }
        if (options.hideZero) { for (let key in dhms) { if (!dhms[key]) delete dhms[key]; } }

        const keys = Object.keys(dhms);
        const limit = Math.min(options.limit || keys.length, keys.length);
        const sliced = keys.reverse().slice(0, limit);

        if (!options.fullname) return sliced.map(key => `${dhms[key]}${key}`).join(' ');
        else {
            const array = sliced.map(key => `${dhms[key]}${FULLNAMES[key]}${dhms[key] > 1 ? 's' : ''}`);
            return array.length > 1 ? array.slice(0, -1).join(' ') + ' and ' + array.slice(-1) : array[0];
        }
    }

    static print(time, options) {
        return new DHMS(time).print(options);
    }

    static burn(timeString) {
        return (
            parseFloat(timeString.match(/[0-9]+(?:(?= ?y)|(?= ?years?))/g) || 0) * 1000 * 60 * 60 * 24 * (365 / 12) * 12 +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?M)|(?= ?months?))/g) || 0) * 1000 * 60 * 60 * 24 * (365 / 12) +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?d)|(?= ?days?))/g) || 0) * 1000 * 60 * 60 * 24 +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?h)|(?= ?hours?))/g) || 0) * 1000 * 60 * 60 +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?m)|(?= ?minutes?))/g) || 0) * 1000 * 60 +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?s)|(?= ?seconds?))/g) || 0) * 1000 +
            parseFloat(timeString.match(/[0-9]+(?:(?= ?ms)|(?= ?milliseconds?))/g) || 0)
        );
    }
}
