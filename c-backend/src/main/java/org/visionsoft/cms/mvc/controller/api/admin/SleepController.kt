package org.visionsoft.cms.mvc.controller.api.admin

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/sleep")
@RestController
class SleepController {

    @GetMapping
    fun sleep(@RequestParam ms:Long) = Thread.sleep(ms).let { true }

}
