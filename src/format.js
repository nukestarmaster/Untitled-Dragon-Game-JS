function format(n, sd = 0) {
    return (Math.floor(n * 10 ** sd) / 10 ** sd).toFixed(sd)
}

export {format}