const mongoose = require("mongoose");
const connection = require("./connection");

const schema = new mongoose.Schema(
  {
    enable_hr: false,
    denoising_strength: 0,
    firstphase_width: 0,
    firstphase_height: 0,
    hr_scale: 2,
    hr_upscaler: "string",
    hr_second_pass_steps: 0,
    hr_resize_x: 0,
    hr_resize_y: 0,
    filter_nsfw: false,
    sd_model_checkpoint: "revAnimated_v122.safetensors [f8bb2922e1]",
    hr_sampler_name: "string",
    hr_prompt: "",
    hr_negative_prompt: "",
    prompt: "string",
    styles: ["string"],
    seed: -1,
    subseed: -1,
    subseed_strength: 0,
    seed_resize_from_h: -1,
    seed_resize_from_w: -1,
    sampler_name: "DPM++ 2M Karras",
    batch_size: 1,
    n_iter: 1,
    steps: 50,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: false,
    tiling: false,
    do_not_save_samples: false,
    do_not_save_grid: false,
    negative_prompt:
      "string",
    eta: 0,
    s_min_uncond: 0,
    s_churn: 0,
    s_tmax: 0,
    s_tmin: 0,
    s_noise: 1,
    override_settings: {},
    override_settings_restore_afterwards: true,
    script_args: [],
    sampler_index: "Euler",
    //"script_name": "string",
    send_images: true,
    save_images: false,
    alwayson_scripts: {},
  },
  { timestamps: true }
);
const stable = mongoose.model("stable", schema);

module.exports = stable;
