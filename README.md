IEvents
================
This class provides 2 improvements to the Events mixin:

1. It provides a mechanism for cancelling events (like with input events)
2. It fixes an issue with the original class where a broken callback would crash the event loop (will not work for cancellables, as they're execution should be dependable).

How to use
----------

For allowing cancelled events, you need to supply an extra field in your class, named *cancellables*, which should be an array containing a list on cancellabe event names.
What the class will do is to stop the event loop on the first callback that returns false, as well as making *fireEvent* return false.
Look at the demo to see it in action.


