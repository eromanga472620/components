<template>
<div class="border-bg">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-form
          :model="saveForm"
          class="save-base"
          label-width="120px"
          size="mini"
          label-position="right"
          ref="saveForm"
        >
          <el-row :gutter="130">
            <el-col :span="10">
              <el-form-item label="OME机构：" prop="oemCode">
                <el-select
                  v-model="saveForm.oemCode"
                  clearabl
                  filterable
                  size="mini"
                  disabled
                >
                  <el-option
                    v-for="item in organizationList"
                    :key="item.oemCode"
                    :label="item.oemName"
                    :value="item.oemCode"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="服务商身份：" prop="identity">
                <el-select
                  v-model="saveForm.identity"
                  clearable
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in $formatTypeArray('merchantType')"
                    :key="item.label"
                    :label="item.name"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="130">
            <el-col :span="10">
              <el-form-item label="服务商名称：" prop="userName">
                <el-input
                  v-model="saveForm.userName"
                  placeholder="请输入企业名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="saveForm.identity === 2">
              <el-form-item label="统一信用代码：" prop="licenseNo">
                <el-input
                  v-model="saveForm.creditCode"
                  placeholder="请输入统一信用代码"
                ></el-input>
                <span class="title-span"
                  >(注：统一信用代码提交成功后，不可修改。)</span
                >
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="saveForm.identity === 1">
              <el-form-item label="身份证号：" prop="idNo">
                <el-input
                  v-model="saveForm.idNo"
                  placeholder="请输入身份证号码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="130">
            <el-col :span="10">
              <el-form-item label="绑定手机号：" prop="phoneNo">
                <el-input
                  v-model="saveForm.phoneNo"
                  placeholder="请输入绑定手机号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10" v-show="saveForm.identity === 2">
              <el-form-item label="联系人姓名：" prop="linkmanName">
                <el-input
                  v-model="saveForm.linkmanName"
                  placeholder="请输入联系人姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="联系地址：" prop="userAddr">
                <el-input
                  v-model="saveForm.userAddr"
                  placeholder="请输入联系地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="130">
            <el-col :span="10" v-show="saveForm.identity === 2">
              <el-form-item label="法人姓名：" prop="legalUserName">
                <el-input
                  v-model="saveForm.legalUserName"
                  placeholder="请输入法人姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="saveForm.identity === 2">
              <el-form-item label="法人身份证号：" prop="idNo">
                <el-input
                  v-model="saveForm.idNo"
                  placeholder="请输入法人身份证号"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="130">
            <el-col :span="10">
              <el-form-item label="是否顶级服务商：" prop="topFlag">
                <el-select
                  v-model="saveForm.topFlag"
                  clearable
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in $formatTypeArray('isTrueFalse')"
                    :key="item.label"
                    :label="item.name"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="saveForm.topFlag === 1">
              <el-form-item label="所属事业部：" prop="serviceGroup">
                <el-select
                  v-model="saveForm.serviceGroup"
                  clearable
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option label="全部" key="-1" value=""></el-option>
                  <el-option
                    v-for="item in $formatTypeArray('businessDivision')"
                    :key="item.label"
                    :label="item.name"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="saveForm.topFlag === 0">
               <el-form
                :model="InviteUser"
                label-width="120px"
                :rules="rulesPhone"
                size="mini"
                ref="InviteUser"
                >
                  <el-form-item
                    label="推广人手机号: "
                    prop="inviteUserPhone"
                  >
                  <el-input
                    v-model="InviteUser.inviteUserPhone"
                    placeholder="请输入推广人手机号"
                    style="width:200px"
                  ></el-input>
                  <el-button type="primary" v-on:click="queryPhone" icon="el-icon-search">查询</el-button>
                </el-form-item>
                </el-form>
            </el-col>
          </el-row>
          <el-row :gutter="130" v-show="saveForm.topFlag === 0">
          <el-col :span="10">
            <el-form-item label="推广人名称: " prop="inviteUserName">
              <el-input
                v-model="InviteUser.inviteUserName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
              <el-form-item label="推广人身份: " prop="inviteUserLevel">
                <el-select
                  v-model="InviteUser.inviteUserLevel"
                  clearable
                  size="mini"
                  disabled
                >
                  <el-option
                    v-for="item in $formatTypeArray('levelStatus')"
                    :key="item.label"
                    :label="item.name"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="130" v-show="saveForm.topFlag === 0">
            <el-col :span="10">
              <el-form-item label="所属服务商: " prop="">
                  <el-input
                      v-model="InviteUser.superiorUserName"
                      disabled
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
                <el-form-item label="上传协议附件：" prop="protocols">
                <div v-for="(item, index) in saveForm.protocols" :key="index">
                    <span>{{item.fileName}}</span>
                    <el-button type="text" @click="downloadData(item.fileId)">点击下载</el-button>
                </div>
                </el-form-item>
            </el-col>
          </el-row>
          <!-- idCardImgFront -->
          <el-row :gutter="130">
            <el-col :span="10">
              <el-form-item label="上传身份证正面：" prop="idCardImgFront">
                <upload-image
                  @imageSuccess="handleAvatarSuccessByICCardAA"
                  v-model="saveForm.idCardImgFront"
                  :imageSrc="saveForm.idCardFrontUrl"
                  :fileType="idCardAAType"
                  :oem-code="saveForm.oemCode"
                />
              </el-form-item>
            </el-col>
            <!-- idCardImgBack -->
            <el-col :span="10" >
              <el-form-item label="上传身份证反面：" prop="idCardImgBack">
                <upload-image
                  @imageSuccess="handleAvatarSuccessByICCardBB"
                  v-model="saveForm.idCardImgBack"
                  :fileType="idCardBBType"
                  :imageSrc="saveForm.idCardBackUrl"
                  :oem-code="saveForm.oemCode"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- businessLicenseImg -->
          <el-row :gutter="130" >
            <el-col :span="10" v-show="saveForm.identity === 2">
              <el-form-item label="上传营业执照：" >
                <upload-image
                  @imageSuccess="handleAvatarSuccessBylicense"
                  v-model="saveForm.businessLicenseImg"
                  :imageSrc="saveForm.businessLicenseUrl"
                  :fileType="businessLicenseType"
                  :oem-code="saveForm.oemCode"
                />
              </el-form-item>
            </el-col>
          </el-row>
          
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="账户信息" name="second">
       <el-form :model="saveForm.bankCard" class="save-base"
               label-width="120px"
               size="mini"
               label-position="left"
               ref="saveForm"
               >
        <el-row :gutter="130">
          <el-col :span="10">
            <el-form-item label="账户名称" prop="accountName">
              <el-input v-model="saveForm.bankCard.accountName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="账户类型" prop="accountType">
            <el-select
            v-model="saveForm.bankCard.accountType"
            clearable
            size="mini"

            >
              <el-option
                v-for="item in $formatTypeArray('bankType')"
                :key="item.label"
                :label="item.name"
                :value="item.label"
                >
              </el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="130">
          <el-col :span="10">
            <el-form-item label="银行卡号" prop="bankCardNo">
              <el-input v-model="saveForm.bankCard.bankCardNo" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="银行名称" prop="bankName">
              <el-input v-model="saveForm.bankCard.bankName" placeholder="请输入银行名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="130">
          <el-col :span="10">
            <el-form-item label="开户行" prop="subBankName" v-show="saveForm.identity===2">
              <el-input v-model="saveForm.bankCard.subBankName" placeholder="请输入开户行"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

         <el-row :gutter="130">
          <el-col :span="10">
            <el-form-item label="银行预留手机号" prop="bankCardPhone"  v-show="saveForm.identity===1">
              <el-input v-model="saveForm.bankCard.bankCardPhone" placeholder="请输入银行预留手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>

      <div style='text-align: center;margin: 12px'>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
        <el-button type="danger" @click="goBack">取消</el-button>
      </div>
  </el-tabs>
</div>
</template>
<script>
import ItemTitle from '@/base/ui/title/itemTitle'
import UploadImage from '@/base/ui/upload/uploadImage'
import UploadMoreFile from '@/base/ui/upload/uploadMoreFile'
import { getAcountInfo } from '@/utils/auth'
import { downloadPdf } from '@/utils/util'
import { getServiceDetail, applyAudit, updateApply, queryInviteUser, downloadFile } from '@/api/merchant'
import { isIdCardNo, isMobile } from '@/utils/validate_rules'
import { USER_APPLY_SHOW } from '@/utils/idName'

export default {
  name: 'apply-audit',
  components: { UploadMoreFile, UploadImage, ItemTitle },

  data() {
    return {
      isDetail: false,
      idCardAAType: 1,
      idCardBBType: 2,
      businessLicenseType: 3,
      activeName: 'first',
      bankType: this.$formatTypeArray('bankType'),
      businessDivision: this.$formatTypeArray('businessDivision'),
      applyStatus: this.$formatTypeArray('applyStatus'),
      checkRules: {
        auditStatus: [{
          required: true, message: '请选择', trigger: 'change'
        }] },
      mUser: {}, // groupType   0-平台   1-OEM机构
      saveForm: {
        topFlag: '',
        userName: '',
        bankCard: {
          accountName: '',
          userServiceType: ''
        }
      },
      rulesPhone: {
        inviteUserPhone: [
          { required: true, message: '请输入绑定手机号', trigger: 'blur' },
          { validator: isMobile, trigger: 'blur' }
        ]
      },
      InviteUser: {
        inviteUserLevel: '',
        inviteUserPhone: '',
        phoneNo: ''
      },
      fileList: [],
      options: [],
      organizationList: ''
    }
  },
  methods: {
    queryPhone() {
      this.$refs['InviteUser'].validate((valid) => {
        if (valid) {
          var parmas = { 'oemCode': this.saveForm.oemCode, 'inviteUserPhone': this.InviteUser.inviteUserPhone, 'userId': this.saveForm.userId }
          queryInviteUser(parmas).then((response) => {
            if (response.data[0] !== undefined) {
              this.InviteUser = response.data[0]
            }
            this.saveForm.inviteUserId = this.InviteUser.inviteUserId
          }).catch(() => {
          })
        }
      })
    },
    submitForm() {
      // const that = this
      this.$refs['saveForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定提交审核？', '温馨提示', {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            console.log(this.saveForm)
            this.saveForm.userId = this.$route.query.id
            updateApply(this.saveForm).then((res) => {
              console.log(res)
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$refs['saveForm'].resetFields()
              this.goBack()
            })
          })
        } else {
          return false
        }
      })
    },
    downloadData(id) {
      downloadFile({ 'fileId': Number(id) }).then(response => {
        downloadPdf(response.data, '协议.PDF')
      })
    },
    // imageSrcAA() {
    //   this.saveForm.idCardImgFront
    // },
    goBack() {
      this.$router.go(-1)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handleAvatarSuccessByICCardAA(res, file) {
      this.saveForm.idCardImgFront = res.data.fileId
    },
    handleAvatarSuccessByICCardBB(res, file) {
      this.saveForm.idCardImgBack = res.data.fileId
    },
    changeFileList(fileList) {
      console.log(fileList)
      this.fileList = fileList
    },
    handleAvatarSuccessBylicense(res, file) {
      this.saveForm.licensePic = res.data.saveKey
    }
  },
  created() {
    this.mUser = getAcountInfo() // groupType   0-平台   1-OEM机构
    getServiceDetail(this.$route.query.id).then(res => {
      for (const key in res.data) {
        if (res.data[key] === null) {
          res.data[key] = {}
        }
      }
      if (res.data) {
        this.saveForm = {
          ...res.data,
          userName: ''
        }
      }
      this.saveForm.identity = this.saveForm.userServiceType
      this.saveForm.idCardImgFront = res.data.idCardFrontId
      this.saveForm.idCardImgBack = res.data.idCardBackId
      this.saveForm.businessLicenseImg = res.data.businessLicenseId
      this.saveForm.userName = res.data.serviceName
      if (res.data.inviteUser != null) {
        this.InviteUser = res.data.inviteUser
      }
    })
    this.isDetail = JSON.parse(sessionStorage.getItem(USER_APPLY_SHOW))
  },
  mounted() {
  },
  watch: {
    // InviteUser: function(newValue, oldValue) {
    //   console.log(newValue)
    //   this.InviteUser.inviteUserLevel = newValue != null ? newValue.inviteUserLevel : ''
    //   this.InviteUser.inviteUserPhone = newValue != null ? newValue.inviteUserPhone : ''
    // },
    // 'saveForm.identity'() {
    //   return this.saveForm.identity
    // }
  }
}
</script>
<style lang="scss" scoped>
</style>