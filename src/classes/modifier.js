class Modifiers {
    constructor() {
        this.flat = {}
        this.inc = {}
        this.more = {}
    }
    setMod(modType, target, origin, magnitude) {
        if (!this.modType.target.join(".")) {
            this[modType][target.join(".")] = {}
        }
        this[modType][target.join(".")][origin.join(".")] = magnitude
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
        try {
            return this[type][comp].values()
        }
        catch {
            return []
        }
    }
}

export { Modifiers }