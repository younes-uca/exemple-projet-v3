package  com.ird.faa.ws.rest.provided.facade.chercheur;

import com.ird.faa.service.chercheur.facade.PaiementDetailChercheurService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.ird.faa.bean.PaiementDetail;
import com.ird.faa.ws.rest.provided.converter.PaiementDetailConverter;
import com.ird.faa.ws.rest.provided.vo.PaiementDetailVo;

@Api("Manages paiementDetail services")
@RestController
@RequestMapping("api/chercheur/paiementDetail")
public class PaiementDetailRestChercheur {

@Autowired
private PaiementDetailChercheurService paiementDetailService;

@Autowired
private PaiementDetailConverter paiementDetailConverter;


            @ApiOperation("Updates the specified  paiementDetail")
            @PutMapping("/")
            public  PaiementDetailVo update(@RequestBody  PaiementDetailVo  paiementDetailVo){
            PaiementDetail paiementDetail = paiementDetailConverter.toItem(paiementDetailVo);
            paiementDetail = paiementDetailService.update(paiementDetail);
            return paiementDetailConverter.toVo(paiementDetail);
            }

    @ApiOperation("Finds a list of all paiementDetails")
    @GetMapping("/")
    public List<PaiementDetailVo> findAll(){
        return paiementDetailConverter.toVo(paiementDetailService.findAll());
    }

    @ApiOperation("Finds a paiementDetail with associated lists by id")
    @GetMapping("/detail/id/{id}")
    public PaiementDetailVo findByIdWithAssociatedList(@PathVariable Long id){
    return paiementDetailConverter.toVo(paiementDetailService.findByIdWithAssociatedList(id));
    }

    @ApiOperation("Search paiementDetail by a specific criteria")
    @PostMapping("/search")
    public List<PaiementDetailVo> findByCriteria(@RequestBody PaiementDetailVo paiementDetailVo){
        return paiementDetailConverter.toVo(paiementDetailService.findByCriteria(paiementDetailVo));
        }

            @ApiOperation("Finds a paiementDetail by id")
            @GetMapping("/id/{id}")
            public PaiementDetailVo findById(@PathVariable Long id){
            return paiementDetailConverter.toVo(paiementDetailService.findById(id));
            }

            @ApiOperation("Saves the specified  paiementDetail")
            @PostMapping("/")
            public PaiementDetailVo save(@RequestBody PaiementDetailVo paiementDetailVo){
            PaiementDetail paiementDetail = paiementDetailConverter.toItem(paiementDetailVo);
            paiementDetail = paiementDetailService.save(paiementDetail);
            return paiementDetailConverter.toVo(paiementDetail);
            }

            @ApiOperation("Delete the specified paiementDetail")
            @DeleteMapping("/")
            public int delete(@RequestBody PaiementDetailVo paiementDetailVo){
            PaiementDetail paiementDetail = paiementDetailConverter.toItem(paiementDetailVo);
            return paiementDetailService.delete(paiementDetail);
            }

            @ApiOperation("Deletes a paiementDetail by id")
            @DeleteMapping("/id/{id}")
            public int deleteById(@PathVariable Long id){
            return paiementDetailService.deleteById(id);
            }
        @ApiOperation("find by client reference")
        @GetMapping("/client/reference/{reference}")
        public List<PaiementDetail> findByClientReference(@PathVariable String reference){
        return paiementDetailService.findByClientReference(reference);
        }

        @ApiOperation("delete by client reference")
        @DeleteMapping("/client/reference/{reference}")
        public int deleteByClientReference(@PathVariable String reference){
        return paiementDetailService.deleteByClientReference(reference);
        }

        @ApiOperation("find by client id")
        @GetMapping("/client/id/{id}")
        public List<PaiementDetail> findByClientId(@PathVariable Long id){
        return paiementDetailService.findByClientId(id);
        }

        @ApiOperation("delete by client id")
        @DeleteMapping("/client/id/{id}")
        public int deleteByClientId(@PathVariable Long id){
        return paiementDetailService.deleteByClientId(id);
        }

        @ApiOperation("find by paiement reference")
        @GetMapping("/paiement/reference/{reference}")
        public List<PaiementDetail> findByPaiementReference(@PathVariable String reference){
        return paiementDetailService.findByPaiementReference(reference);
        }

        @ApiOperation("delete by paiement reference")
        @DeleteMapping("/paiement/reference/{reference}")
        public int deleteByPaiementReference(@PathVariable String reference){
        return paiementDetailService.deleteByPaiementReference(reference);
        }

        @ApiOperation("find by paiement id")
        @GetMapping("/paiement/id/{id}")
        public List<PaiementDetail> findByPaiementId(@PathVariable Long id){
        return paiementDetailService.findByPaiementId(id);
        }

        @ApiOperation("delete by paiement id")
        @DeleteMapping("/paiement/id/{id}")
        public int deleteByPaiementId(@PathVariable Long id){
        return paiementDetailService.deleteByPaiementId(id);
        }



            }
