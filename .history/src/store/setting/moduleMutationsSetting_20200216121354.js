export default {
    SET_SETTING: (state,setting) =>
    {
        if(setting.type_setting == 'store')
        {
            state.settings.store = setting.setting
        }
    },
    UPDATE_SETTING: (state,setting) => {
        if(setting.type_setting == 'store')
        {
            state.settings.store= setting.value_setting
        }
    }
}