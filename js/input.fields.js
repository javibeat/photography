jQuery.fn.inputHints = function() {
    this.each(function() {
        const $this = jQuery(this);
        const titleText = $this.attr('title');
        $this.val(titleText);

        $this.focus(function() {
            if ($this.val() === titleText) {
                $this.val('');
            }
        }).blur(function() {
            if ($this.val() === '') {
                $this.val(titleText);
            }
        });
    });
    return this;
};

jQuery(document).ready(function() {
    "use strict";
    jQuery('input[title], textarea[title]').inputHints();
});
