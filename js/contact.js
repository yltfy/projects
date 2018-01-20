/*===================================Contact us ============================================*/
var $contact = $("#contact");
var $cuBox = $("#contact .cuBox");
var $psBox = $("#contact .psBox");
$cuBox.on("mouseenter", function() { // 联系我们
	this.bOff = false;
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "linear",
		fnEnd: function() {
			tweenMove({
				obj: $this.get(0),
				oTarget: {
					height: "410"
				},
				iTime: 400,
				iType: "backOut1"
			})
		}
	})
});
$cuBox.on("mouseleave", function() {
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	$this.get(0).iTimer = setTimeout(function() {
		tweenMove({
			obj: $this.get(0),
			oTarget: {
				height: "48"
			},
			iTime: 400,
			iType: "linear",
			fnEnd: function() {
				tweenMove({
					obj: $this.get(0),
					oTarget: {
						width: "116"
					},
					iTime: 200,
					iType: "linear",
					fnEnd: function() {
						$this.get(0).open = false
					}
				})
			}
		})
	}, 1000)
});
$psBox.on("mouseenter", function() {
	this.bOff = false;
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "linear",
		fnEnd: function() {
			tweenMove({
				obj: $this.get(0),
				oTarget: {
					height: "160"
				},
				iTime: 300,
				iType: "backOut"
			})
		}
	})
});
$psBox.on("mouseleave", function() {
	var $this = $(this);
	clearTimeout($this.get(0).iTimer);
	$this.get(0).iTimer = setTimeout(function() {
		tweenMove({
			obj: $this.get(0),
			oTarget: {
				height: "48"
			},
			iTime: 300,
			iType: "linear",
			fnEnd: function() {
				tweenMove({
					obj: $this.get(0),
					oTarget: {
						width: "116"
					},
					iTime: 200,
					iType: "linear"
				})
			}
		})
	}, 1000)
})