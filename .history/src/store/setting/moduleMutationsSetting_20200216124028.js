export default {
    SET_SETTING: (state,setting) =>
    {
        if(setting.type_setting == 'store')
        {
            console.log(setting)
            state.settings.store = JSON.parse(setting.setting.VALUE_SETTING)
        }
    },
    UPDATE_SETTING: (state,setting) => {
        if(setting.type_setting == 'store')
        {
            state.settings.store= setting.value_setting
        }
    }
}