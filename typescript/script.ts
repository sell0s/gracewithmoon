export function toFit(cb : any , { dismissCondition = () => false, triggerCondition = () => true }) {
    if (!cb) {
      throw Error('Invalid required arguments')
    }
  
    let tick = false
    return function() {
        console.log('scroll call')
        if (tick) {
            return
        }
        tick = true
        return requestAnimationFrame(() => {
            if (dismissCondition()) {
                tick = false
                return
            }
  
            if (triggerCondition()) {
                console.log('real call')
                tick = false
                return cb()
            }
        })
    }
}

export function toAdd(a:number, b:number) {
    return a + b;
}