using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

public partial class CMSWebParts_Firstmac_Retail_CanstarLoanComparison_LiveBroker : CMSAbstractWebPart
{
    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
    }

    public string ApplyUrl
    {
        get { return ValidationHelper.GetString(GetValue("ApplyUrl"), string.Empty); }
        set
        {
            SetValue("ApplyUrl", value);
        }
    }

    public int DefaultLoanAmount
    {
        get { return ValidationHelper.GetInteger(GetValue("DefaultLoanAmount"), 30000); }
        set
        {
            SetValue("DefaultLoanAmount", value);
        }
    }
        
    public int DefaultLoanTerm
    {
        get { return ValidationHelper.GetInteger(GetValue("DefaultLoanTerm"), 36); }
        set
        {
            SetValue("DefaultLoanTerm", value);
        }
    }
    
    public double DefaultInterestRate
    {
        get { return ValidationHelper.GetDouble(GetValue("DefaultInterestRate"), 8); }
        set
        {
            SetValue("DefaultInterestRate", value);
        }
    }


    public int DefaultRepaymentFrequency
    {
        get { return ValidationHelper.GetInteger(GetValue("DefaultRepaymentFrequency"), 1); }
        set
        {
            SetValue("DefaultRepaymentFrequency", value);
        }
    }
}