/*
---
description: adds improvements to the original Events mixin

license: MIT

authors:
-Arieh Glazer

requires:
- core/1.3: [Core,Class,Class.Extras]

provides: [IEvents]

...
*/


;(function(){
var removeOn = function(string){
    return string.replace(/^on([A-Z])/, function(full, first){
        return first.toLowerCase();
    });
};

var IEvents = this.IEvents = new Class({
   Extends : Events
   , fireEvent : function fireEvent(type, args, delay){
        type = removeOn(type);

        if (/:\latched/.test(type)){
            type = type.replace(':latched','');

            if (!this.$latched) this.$latched = {};    
            
            this.$latched[type] = {args:args, delay:delay || 1};
        }

        if (this.cancellables && this.cancellables.contains(type)){
            for (var key in this.$events[type]) if (this.$events[type].hasOwnProperty(key)){
                if (!this.$events[type][key].apply(this,Array.from(args))) return false;
            }   
            return this;
        } else return this.parent(type,args,delay || 1);    
   }
   , addEvent : function(type,fn){
        type = removeOn(type);

        if (this.$latched && this.$latched[type]){
            fn.delay(this.$latched.delay, this, this.$latched.args);    
        }

        return this.parent(type,fn);
   }
});

}).apply(this,[]);

