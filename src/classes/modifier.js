class Modifiers {
    constructor() {
        this.flat = {}
        this.inc = {}
        this.more = {}
    }
    setMod(modType, target, origin, magnitude) {
        if (!this[modType][target.join(".")]) {
            this[modType][target.join(".")] = {}
        }
        this[modType][target.join(".")][origin.join(".")] = magnitude
    }
    update(player, compType, compId, modId) {
        player.getComponent(compType, compId).vars[modId].update(player)
    }
    getMods(compType, compId, compMod) {
        return{
            flat: this.getFlat(compType, compId, compMod),
            inc: this.getInc(compType, compId, compMod), 
            more: this.getMore(compType, compId, compMod)
        }
    }
    getModsNoFlat(compType, compId, compMod) {
        return{
            inc: this.getInc(compType, compId, compMod), 
            more: this.getMore(compType, compId, compMod)
        }
    }
    getFlat(compType, compId, compMod) {
        let modlist = this.getMod("flat", `${compType}.${compMod}`).concat(this.getMod("flat", `${compType}.${compId}.${compMod}`))
        return modlist.reduce((a,b) => a+b, 0)
    }
    getInc(compType, compId, compMod) {
        let modlist = this.getMod("inc", `${compType}.${compMod}`).concat(this.getMod("inc", `${compType}.${compId}.${compMod}`))
        return modlist.reduce((a,b) => a+b, 0)
    }
    getMore(compType, compId, compMod) {
        let modlist = this.getMod("more", `${compType}.${compMod}`).concat(this.getMod("more", `${compType}.${compId}.${compMod}`))
        return modlist.reduce((a,b) => a*b, 1)
    }
    getMod(type, comp) {
        if (this[type] && this[type][comp]) {
            return Object.values(this[type][comp])
        }
        return []
    }
    save() {
        return {
            flat: this.flat,
            inc: this.inc,
            more: this.more
        }
    }
    load(data, player) {
        this.flat = data.flat
        this.inc = data.inc
        this.more = data.more
    }
    update() {
        return
    }
}

export { Modifiers }